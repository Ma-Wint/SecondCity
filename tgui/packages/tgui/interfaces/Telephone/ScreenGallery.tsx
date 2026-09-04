// THIS IS A DARKPACK UI FILE
import { useBackend } from 'tgui/backend';
import { Box, Icon, Stack } from 'tgui-core/components';

import { type Data, NavigableApps } from '.';

export const ScreenGallery = (props: {
  setApp: React.Dispatch<React.SetStateAction<NavigableApps | null>>;
}) => {
  const { setApp } = props;
  const { act, data } = useBackend<Data>();
  const { photos } = data;

  return (
    <Stack vertical fill backgroundColor="#fff" textColor="#000">
      <Stack.Item>
        <Box
          backgroundColor="#5f5f5f"
          textColor="#fff"
          pl={1}
          pb={1.5}
          pt={1.5}
          pr={1}
          fontSize={1.5}
        >
          <Stack align="center">
            <Icon
              name="arrow-left"
              onClick={() => setApp(null)}
              style={{ cursor: 'pointer' }}
            />
            <Stack.Item grow ml={1}>
              Gallery
            </Stack.Item>
            <Stack.Item
              style={{ cursor: 'pointer' }}
              onClick={() => setApp(NavigableApps.Camera)}
            >
              <Icon name="camera" />
            </Stack.Item>
          </Stack>
        </Box>
      </Stack.Item>
      <Stack.Item grow style={{ overflowY: 'auto' }}>
        {photos.length === 0 ? (
          <Box p={2} textAlign="center" color="#999">
            No photos yet. Open the Camera to take one!
          </Box>
        ) : (
          <Stack wrap="wrap">
            {photos.map((photo) => (
              <Stack.Item key={photo.ref} basis="33%">
                <Box
                  position="relative"
                  m={0.5}
                  style={{ borderRadius: '4px', overflow: 'hidden' }}
                  backgroundColor="#eee"
                >
                  <img
                    src={`data:image/png;base64,${photo.image}`}
                    alt={photo.name}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                  <Box
                    position="absolute"
                    top={0}
                    right={0}
                    p={0.5}
                    backgroundColor="#00000088"
                    style={{ borderRadius: '0 0 0 4px', cursor: 'pointer' }}
                    onClick={() => act('delete_photo', { photo_ref: photo.ref })}
                  >
                    <Icon name="trash" color="#fff" />
                  </Box>
                </Box>
              </Stack.Item>
            ))}
          </Stack>
        )}
      </Stack.Item>
    </Stack>
  );
};
