// THIS IS A DARKPACK UI FILE
import { useState } from 'react';
import { useBackend } from 'tgui/backend';
import { Box, Button, Icon, Stack } from 'tgui-core/components';

import { type Data, NavigableApps } from '.';

const PICTURE_SIZE_OPTIONS = [1, 2, 3, 4, 5];

export const ScreenCamera = (props: {
  setApp: React.Dispatch<React.SetStateAction<NavigableApps | null>>;
}) => {
  const { setApp } = props;
  const { act, data } = useBackend<Data>();
  const { camera_view, viewfinder_size, pic_width, pic_height } = data;
  const [showSettings, setShowSettings] = useState(false);

  const viewSize = viewfinder_size ?? 5;
  const targetTileX = data.photo_target_tile_x ?? Math.floor((viewSize - 1) / 2);
  const targetTileY = data.photo_target_tile_y ?? Math.floor((viewSize - 1) / 2);
  const currentWidth = pic_width ?? 2;
  const currentHeight = pic_height ?? 2;

  const handleViewfinderClick = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const fx = (event.clientX - rect.left) / rect.width;
    const fy = (event.clientY - rect.top) / rect.height;
    const tileX = Math.min(
      viewSize - 1,
      Math.max(0, Math.floor(fx * viewSize)),
    );
    const tileY = Math.min(
      viewSize - 1,
      Math.max(0, Math.floor(fy * viewSize)),
    );
    act('set_photo_target', { tile_x: tileX, tile_y: tileY });
  };

  const setWidth = (value: number) => {
    act('set_picture_size', { width: value, height: currentHeight });
  };

  const setHeight = (value: number) => {
    act('set_picture_size', { width: currentWidth, height: value });
  };

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
      <Stack.Item
        grow
        style={{
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Viewfinder */}
        <Box
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '1 / 1',
            backgroundColor: '#111',
            overflow: 'hidden',
            cursor: 'crosshair',
          }}
          onClick={handleViewfinderClick}
        >
          {camera_view ? (
            <img
              src={`data:image/png;base64,${camera_view}`}
              alt="viewfinder"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                imageRendering: 'pixelated',
                display: 'block',
              }}
            />
          ) : (
            <Box
              fill
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="camera" size={6} color="#ffffff33" />
            </Box>
          )}
          {/* Aiming reticle */}
          <Box
            position="absolute"
            style={{
              left: `${((targetTileX + 0.5) / viewSize) * 100}%`,
              top: `${((targetTileY + 0.5) / viewSize) * 100}%`,
              transform: 'translate(-50%, -50%)',
              width: '14px',
              height: '14px',
              border: '2px solid #4a90e2',
              borderRadius: '50%',
              pointerEvents: 'none',
              boxShadow: '0 0 4px #000000aa',
            }}
          />
          <Box
            position="absolute"
            bottom={0.5}
            left={0}
            right={0}
            textAlign="center"
            fontSize={0.8}
            textColor="#ffffff88"
            style={{ pointerEvents: 'none' }}
          >
            Tap to aim
          </Box>
        </Box>
      </Stack.Item>
      {showSettings && (
        <Stack.Item>
          <Box
            backgroundColor="#00000099"
            p={1}
            textColor="#fff"
            fontSize={1}
          >
            <Stack vertical>
              <Stack.Item>
                <Box bold fontSize={1.1}>
                  Photo size (1x1 – 5x5)
                </Box>
              </Stack.Item>
              <Stack.Item>
                <Stack align="center">
                  <Box width={4} textColor="#aaa">
                    Width
                  </Box>
                  <Stack.Item grow>
                    <Stack justify="space-between">
                      {PICTURE_SIZE_OPTIONS.map((value) => (
                        <Button
                          key={value}
                          compact
                          selected={currentWidth === value}
                          onClick={() => setWidth(value)}
                        >
                          {value}
                        </Button>
                      ))}
                    </Stack>
                  </Stack.Item>
                </Stack>
              </Stack.Item>
              <Stack.Item>
                <Stack align="center">
                  <Box width={4} textColor="#aaa">
                    Height
                  </Box>
                  <Stack.Item grow>
                    <Stack justify="space-between">
                      {PICTURE_SIZE_OPTIONS.map((value) => (
                        <Button
                          key={value}
                          compact
                          selected={currentHeight === value}
                          onClick={() => setHeight(value)}
                        >
                          {value}
                        </Button>
                      ))}
                    </Stack>
                  </Stack.Item>
                </Stack>
              </Stack.Item>
            </Stack>
          </Box>
        </Stack.Item>
      )}
      <Stack.Item>
        <Stack align="center" justify="space-around" p={2}>
          <Stack.Item
            style={{ cursor: 'pointer' }}
            onClick={() => setApp(NavigableApps.Gallery)}
          >
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
          <Stack.Item
            style={{ cursor: 'pointer' }}
            onClick={() => setShowSettings(!showSettings)}
          >
            <Icon
              name="gear"
              size={2}
              color={showSettings ? '#4a90e2' : '#ffffff88'}
            />
          </Stack.Item>
        </Stack>
      </Stack.Item>
    </Stack>
  );
};
