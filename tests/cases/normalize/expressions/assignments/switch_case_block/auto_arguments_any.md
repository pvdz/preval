# Preval test case

# auto_arguments_any.md

> Normalize > Expressions > Assignments > Switch case block > Auto arguments any
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = arguments;
  }
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    {
      a = arguments;
    }
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  a = arguments;
} else {
}
$(a);
`````

## Output


`````js filename=intro
const tmpSwitchDisc = $(1);
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  arguments;
  $(arguments);
} else {
  const a = { a: 999, b: 1000 };
  $(a);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
if (c) {
  arguments;
  $( arguments );
}
else {
  const d = {
    a: 999,
    b: 1000,
  };
  $( d );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

arguments

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 
  {
    0: '"<$>"',
    1: '"<function>"',
    2: '"<function>"',
    3: '"<function>"',
    4: '"<function>"',
    5: '"<function>"',
    6: '"<function>"',
    7: '"<function>"',
    8: '"<function>"',
    9: '"<function>"',
    10: '"<function>"',
    11: '"<function>"',
    12: '"<$spy>"',
    13: '"<function>"',
    14: '"<function>"',
    15: 'true',
    16: '[]',
    17: '"<function>"',
    18: '"<function>"',
    19: '"<function>"',
    20: '"<function>"',
    21: '"<function>"',
    22: '"<function>"',
    23: '"<function>"',
    24: '"<function>"',
    25: '"<function>"',
    26: '"<function>"',
    27: '{}',
    28: '"<function>"',
    29: '{}',
    30: '{}',
    31: '"<function>"',
    32: 'undefined',
    33: 'undefined',
    34: 'undefined',
    35: 'undefined',
    36: 'undefined',
    37: 'undefined',
    38: '"<function>"',
    39: '{}',
    40: '"<function>"',
    41: '"<function>"',
    42: '"<function>"',
    43: '"<function>"',
    44: '"<function>"',
    45: '"<function>"',
    46: '"<function>"',
    47: '{}',
    48: '"<function>"',
    49: 'true',
    50: 'true',
    51: 'true',
    52: 'true',
    53: 'true',
    54: 'true',
    55: 'true',
    56: 'true',
    57: 'true',
    58: 'true',
    59: 'true',
  },

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
