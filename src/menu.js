import React from 'react';
import { render, Text, Box, Newline } from 'ink';
const command = require('../command.json')

const Menu = () => {
  const firstColumnWidth = 32;
  const header = (
    <Box>
      <Box width={firstColumnWidth}>
        <Text>命令</Text>
      </Box>
      <Box width={firstColumnWidth}>
        <Text>别名</Text>
      </Box>
      <Box>
        <Text>说明</Text>
      </Box>
      <Newline/>
    </Box>
  );

  const body = command.map(commandItem => {
    return (
      <Box key={commandItem.name} alignItems="flex-start">
        <Box width={firstColumnWidth}>
          <Text>-{commandItem.name}</Text>
        </Box>
        <Box width={firstColumnWidth}>
          <Text>{commandItem.alias.map(aliaItem => `--${aliaItem}`).join(', ')}</Text>
        </Box>
        <Box>
          <Text>{commandItem.description}</Text>
        </Box>
        <Newline/>
      </Box>
    )
  })
	return (
    <>
      {header}
      {body}
    </>
  );
};

render(<Menu />);