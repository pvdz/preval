# Preval test case

# auto_arguments_any.md

> Normalize > Expressions > Assignments > Arr spread > Auto arguments any
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$([...(a = arguments)]);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$([...(a = arguments)]);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = arguments;
let tmpArrSpread = a;
const tmpCalleeParam = [...tmpArrSpread];
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const a = arguments;
const tmpCalleeParam = [...a];
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = arguments;
const b = [ ... a ];
$( b );
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

arguments

## Result

Should call `$` with:
 - 1: 
  [
    '<$>',
    '<function>',
    '<function>',
    '<$spy>',
    '<function>',
    '<function>',
    true,
    [],
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    {},
    '<function>',
    {},
    {},
    '<function>',
    {},
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    {},
    '<function>',
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ],

 - 2: 
  {
    0: '"<$>"',
    1: '"<function>"',
    2: '"<function>"',
    3: '"<$spy>"',
    4: '"<function>"',
    5: '"<function>"',
    6: 'true',
    7: '[]',
    8: '"<function>"',
    9: '"<function>"',
    10: '"<function>"',
    11: '"<function>"',
    12: '"<function>"',
    13: '"<function>"',
    14: '"<function>"',
    15: '"<function>"',
    16: '"<function>"',
    17: '"<function>"',
    18: '{}',
    19: '"<function>"',
    20: '{}',
    21: '{}',
    22: '"<function>"',
    23: '{}',
    24: '"<function>"',
    25: '"<function>"',
    26: '"<function>"',
    27: '"<function>"',
    28: '"<function>"',
    29: '"<function>"',
    30: '"<function>"',
    31: '{}',
    32: '"<function>"',
    33: 'true',
    34: 'true',
    35: 'true',
    36: 'true',
    37: 'true',
    38: 'true',
    39: 'true',
    40: 'true',
    41: 'true',
    42: 'true',
    43: 'true',
  },

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
