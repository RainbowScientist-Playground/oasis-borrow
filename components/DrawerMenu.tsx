import { Icon } from '@makerdao/dai-ui-icons'
import React, { PropsWithChildren } from 'react'
import { Box, SxProps } from 'theme-ui'

export type DrawerMenuProps = {
  isOpen: boolean
  onClose: () => void
  position?: 'left' | 'right'
  overlay?: boolean
  sxOverride?: Partial<SxProps['sx']>
}

export const DrawerMenu = ({
  children,
  isOpen,
  onClose,
  position = 'left',
  overlay = false,
  sxOverride = {},
}: PropsWithChildren<DrawerMenuProps>) => {
  const isPositionLeft = position === 'left'
  const isPositionRight = position === 'right'
  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: isPositionLeft ? 0 : 'auto',
          right: isPositionRight ? 0 : 'auto',
          bottom: 0,
          width: ['100%', 'auto'],
          minWidth: ['50%', 'auto'],
          p: 3,
          bg: 'neutral10',
          boxShadow: 'buttonMenu',
          overflow: 'hidden',
          zIndex: 4,
          transform: isPositionLeft
            ? `translateX(${isOpen ? '0' : '-100%'})`
            : `translateX(${isOpen ? '0' : '100%'})`,
          transition: 'transform 200ms',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            boxShadow: 'inset 0 -20px 10px -10px white, inset 0 20px 10px -10px white',
            pointerEvents: 'none',
          },
          ...sxOverride,
        }}
      >
        {children}
        <Box
          sx={{
            position: 'absolute',
            bottom: ['auto', 3],
            top: [3, 'auto'],
            right: 0,
            left: [3, 0],
            width: ['40px', '58px'],
            margin: [null, 'auto'],
            color: 'neutral80',
            overflow: 'hidden',
            cursor: 'pointer',
            '&:hover': {
              color: 'primary100',
            },
          }}
          onClick={onClose}
        >
          <Icon
            name="mobile_menu_close"
            size={[40, 58]}
            sx={{
              p: 1,
              borderRadius: 'circle',
              bg: 'neutral10',
              transition: 'color 200ms',
            }}
          />
        </Box>
      </Box>
      {overlay && isOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bg: 'rgba(0,0,0,0.5)',
            opacity: isOpen ? 1 : 0,
            transition: 'opacity 200ms, visibility 200ms',
            zIndex: 3,
            pointerEvents: isOpen ? 'all' : 'none',
          }}
          onClick={onClose}
        />
      )}
    </>
  )
}