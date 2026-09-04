// THIS IS A DARKPACK UI FILE
import { useBackend } from 'tgui/backend';
import { Box, Icon, Stack } from 'tgui-core/components';

import { type Data, NavigableApps } from '.';

export const ScreenCamera = (props: {
  setApp: React.Dispatch<React.SetStateAction<NavigableApps | null>>;
}) => {
  const { setApp } = props;
  const { act, data } = useBackend<Data>();
  const { photos } = data;

  // Most recently taken photo, if any.
  const lastPhoto = photos.length > 0 ? photos[photos.length - 1] : null;

  return (
    <Stack vertical fill backgroundColor="#000" textColor="#fff">
      <Stack.Item>
        <Box
          backgroundColor="#00000066"
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
              Camera
            </Stack.Item>
            <Stack.Item
              style={{ cursor: 'pointer' }}
              onClick={() => setApp(NavigableApps.Gallery)}
            >
              <Icon name="images" />
            </Stack.Item>
          </Stack>
        </Box>
      </Stack.Item>
      <Stack.Item grow style={{ overflow: 'hidden', position: 'relative' }}>
        {/* Viewfinder */}
        <Box
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          backgroundColor="#111"
        >
          {lastPhoto ? (
            <img
              src={`data:image/png;base64,${lastPhoto.image}`}
              alt={lastPhoto.name}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
            />
          ) : (
            <Icon name="camera" size={6} color="#ffffff33" />
          )}
        </Box>
      </Stack.Item>
      <Stack.Item>
        <Stack align="center" justify="space-around" p={2}>
          <Stack.Item>
            <Icon name="images" size={2} color="#ffffff88" />
          </Stack.Item>
          <Stack.Item>
            <Box
              width={6}
              height={6}
              backgroundColor="#fff"
              style={{ borderRadius: '50%', cursor: 'pointer' }}
              onClick={() => act('take_photo')}
            >
              <Stack fill align="center" justify="center">
                <Stack.Item>
                  <Box
                    width={4.5}
                    height={4.5}
                    backgroundColor="#111"
                    style={{ borderRadius: '50%' }}
                  />
                </Stack.Item>
              </Stack>
            </Box>
          </Stack.Item>
          <Stack.Item>
            <Icon name="retweet" size={2} color="#ffffff88" />
          </Stack.Item>
        </Stack>
      </Stack.Item>
    </Stack>
  );
};
