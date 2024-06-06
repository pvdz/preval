# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > Ternary b > Auto arguments length
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1) ? (a = arguments) : $(200));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1) ? (a = arguments) : $(200));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = arguments;
  tmpCalleeParam = arguments;
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = arguments;
  arguments;
  $(arguments);
} else {
  const tmpClusterSSA_tmpCalleeParam$1 = $(200);
  $(tmpClusterSSA_tmpCalleeParam$1);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
a: 999,
b: 1000
;
const b = $( 1 );
if (b) {
  a = arguments;
  arguments;
  $( arguments );
}
else {
  const c = $( 200 );
  $( c );
}
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

arguments

## Result

Should call `$` with:
 - 1: 1
 - 2: 
  {
    0: '"<$>"',
    1: '"<function>"',
    2: '"<function>"',
    3: '"<$spy>"',
    4: '"<function>"',
    5: '"<function>"',
    6: '"$LOOP_DONE_UNROLLING_ALWAYS_TRUE"',
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
    33: '"$LOOP_UNROLL_0"',
    34: '"$LOOP_UNROLL_1"',
    35: '"$LOOP_UNROLL_2"',
    36: '"$LOOP_UNROLL_3"',
    37: '"$LOOP_UNROLL_4"',
    38: '"$LOOP_UNROLL_5"',
    39: '"$LOOP_UNROLL_6"',
    40: '"$LOOP_UNROLL_7"',
    41: '"$LOOP_UNROLL_8"',
    42: '"$LOOP_UNROLL_9"',
    43: '"$LOOP_UNROLL_10"',
  },

 - 3: 
  {
    0: '"<$>"',
    1: '"<function>"',
    2: '"<function>"',
    3: '"<$spy>"',
    4: '"<function>"',
    5: '"<function>"',
    6: '"$LOOP_DONE_UNROLLING_ALWAYS_TRUE"',
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
    33: '"$LOOP_UNROLL_0"',
    34: '"$LOOP_UNROLL_1"',
    35: '"$LOOP_UNROLL_2"',
    36: '"$LOOP_UNROLL_3"',
    37: '"$LOOP_UNROLL_4"',
    38: '"$LOOP_UNROLL_5"',
    39: '"$LOOP_UNROLL_6"',
    40: '"$LOOP_UNROLL_7"',
    41: '"$LOOP_UNROLL_8"',
    42: '"$LOOP_UNROLL_9"',
    43: '"$LOOP_UNROLL_10"',
  },

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
