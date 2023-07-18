# Preval test case

# auto_arguments_any.md

> Normalize > Expressions > Assignments > For let > Auto arguments any
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = arguments); ; $(1)) $(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = (a = arguments);
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = arguments;
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Output

`````js filename=intro
const a = arguments;
$(a);
$(1);
$(a);
$(1);
$(a);
$(1);
$(a);
$(1);
$(a);
$(1);
$(a);
$(1);
$(a);
$(1);
$(a);
$(1);
$(a);
$(1);
$(a);
$(1);
$(a);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(a);
  $(1);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = arguments;
$( a );
$( 1 );
$( a );
$( 1 );
$( a );
$( 1 );
$( a );
$( 1 );
$( a );
$( 1 );
$( a );
$( 1 );
$( a );
$( 1 );
$( a );
$( 1 );
$( a );
$( 1 );
$( a );
$( 1 );
$( a );
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( a );
  $( 1 );
}
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

arguments

## Result

Should call `$` with:
 - 1: 
  {
    0: '"<$>"',
    1: '"<function>"',
    2: '"<function>"',
    3: '"<$spy>"',
    4: '"<function>"',
    5: '"$LOOP_DONE_UNROLLING_ALWAYS_TRUE"',
    6: '[]',
    7: '"<function>"',
    8: '"<function>"',
    9: '"<function>"',
    10: '"<function>"',
    11: '"<function>"',
    12: '"<function>"',
    13: '"<function>"',
    14: '"<function>"',
    15: '"<function>"',
    16: '"<function>"',
    17: '{}',
    18: '"<function>"',
    19: '{}',
    20: '{}',
    21: '"<function>"',
    22: '{}',
    23: '"<function>"',
    24: '"<function>"',
    25: '"<function>"',
    26: '"<function>"',
    27: '"<function>"',
    28: '"<function>"',
    29: '"<function>"',
    30: '{}',
    31: '"<function>"',
    32: '"$LOOP_UNROLL_0"',
    33: '"$LOOP_UNROLL_1"',
    34: '"$LOOP_UNROLL_2"',
    35: '"$LOOP_UNROLL_3"',
    36: '"$LOOP_UNROLL_4"',
    37: '"$LOOP_UNROLL_5"',
    38: '"$LOOP_UNROLL_6"',
    39: '"$LOOP_UNROLL_7"',
    40: '"$LOOP_UNROLL_8"',
    41: '"$LOOP_UNROLL_9"',
    42: '"$LOOP_UNROLL_10"',
  },

 - 2: 1
 - 3: 
  {
    0: '"<$>"',
    1: '"<function>"',
    2: '"<function>"',
    3: '"<$spy>"',
    4: '"<function>"',
    5: '"$LOOP_DONE_UNROLLING_ALWAYS_TRUE"',
    6: '[]',
    7: '"<function>"',
    8: '"<function>"',
    9: '"<function>"',
    10: '"<function>"',
    11: '"<function>"',
    12: '"<function>"',
    13: '"<function>"',
    14: '"<function>"',
    15: '"<function>"',
    16: '"<function>"',
    17: '{}',
    18: '"<function>"',
    19: '{}',
    20: '{}',
    21: '"<function>"',
    22: '{}',
    23: '"<function>"',
    24: '"<function>"',
    25: '"<function>"',
    26: '"<function>"',
    27: '"<function>"',
    28: '"<function>"',
    29: '"<function>"',
    30: '{}',
    31: '"<function>"',
    32: '"$LOOP_UNROLL_0"',
    33: '"$LOOP_UNROLL_1"',
    34: '"$LOOP_UNROLL_2"',
    35: '"$LOOP_UNROLL_3"',
    36: '"$LOOP_UNROLL_4"',
    37: '"$LOOP_UNROLL_5"',
    38: '"$LOOP_UNROLL_6"',
    39: '"$LOOP_UNROLL_7"',
    40: '"$LOOP_UNROLL_8"',
    41: '"$LOOP_UNROLL_9"',
    42: '"$LOOP_UNROLL_10"',
  },

 - 4: 1
 - 5: 
  {
    0: '"<$>"',
    1: '"<function>"',
    2: '"<function>"',
    3: '"<$spy>"',
    4: '"<function>"',
    5: '"$LOOP_DONE_UNROLLING_ALWAYS_TRUE"',
    6: '[]',
    7: '"<function>"',
    8: '"<function>"',
    9: '"<function>"',
    10: '"<function>"',
    11: '"<function>"',
    12: '"<function>"',
    13: '"<function>"',
    14: '"<function>"',
    15: '"<function>"',
    16: '"<function>"',
    17: '{}',
    18: '"<function>"',
    19: '{}',
    20: '{}',
    21: '"<function>"',
    22: '{}',
    23: '"<function>"',
    24: '"<function>"',
    25: '"<function>"',
    26: '"<function>"',
    27: '"<function>"',
    28: '"<function>"',
    29: '"<function>"',
    30: '{}',
    31: '"<function>"',
    32: '"$LOOP_UNROLL_0"',
    33: '"$LOOP_UNROLL_1"',
    34: '"$LOOP_UNROLL_2"',
    35: '"$LOOP_UNROLL_3"',
    36: '"$LOOP_UNROLL_4"',
    37: '"$LOOP_UNROLL_5"',
    38: '"$LOOP_UNROLL_6"',
    39: '"$LOOP_UNROLL_7"',
    40: '"$LOOP_UNROLL_8"',
    41: '"$LOOP_UNROLL_9"',
    42: '"$LOOP_UNROLL_10"',
  },

 - 6: 1
 - 7: 
  {
    0: '"<$>"',
    1: '"<function>"',
    2: '"<function>"',
    3: '"<$spy>"',
    4: '"<function>"',
    5: '"$LOOP_DONE_UNROLLING_ALWAYS_TRUE"',
    6: '[]',
    7: '"<function>"',
    8: '"<function>"',
    9: '"<function>"',
    10: '"<function>"',
    11: '"<function>"',
    12: '"<function>"',
    13: '"<function>"',
    14: '"<function>"',
    15: '"<function>"',
    16: '"<function>"',
    17: '{}',
    18: '"<function>"',
    19: '{}',
    20: '{}',
    21: '"<function>"',
    22: '{}',
    23: '"<function>"',
    24: '"<function>"',
    25: '"<function>"',
    26: '"<function>"',
    27: '"<function>"',
    28: '"<function>"',
    29: '"<function>"',
    30: '{}',
    31: '"<function>"',
    32: '"$LOOP_UNROLL_0"',
    33: '"$LOOP_UNROLL_1"',
    34: '"$LOOP_UNROLL_2"',
    35: '"$LOOP_UNROLL_3"',
    36: '"$LOOP_UNROLL_4"',
    37: '"$LOOP_UNROLL_5"',
    38: '"$LOOP_UNROLL_6"',
    39: '"$LOOP_UNROLL_7"',
    40: '"$LOOP_UNROLL_8"',
    41: '"$LOOP_UNROLL_9"',
    42: '"$LOOP_UNROLL_10"',
  },

 - 8: 1
 - 9: 
  {
    0: '"<$>"',
    1: '"<function>"',
    2: '"<function>"',
    3: '"<$spy>"',
    4: '"<function>"',
    5: '"$LOOP_DONE_UNROLLING_ALWAYS_TRUE"',
    6: '[]',
    7: '"<function>"',
    8: '"<function>"',
    9: '"<function>"',
    10: '"<function>"',
    11: '"<function>"',
    12: '"<function>"',
    13: '"<function>"',
    14: '"<function>"',
    15: '"<function>"',
    16: '"<function>"',
    17: '{}',
    18: '"<function>"',
    19: '{}',
    20: '{}',
    21: '"<function>"',
    22: '{}',
    23: '"<function>"',
    24: '"<function>"',
    25: '"<function>"',
    26: '"<function>"',
    27: '"<function>"',
    28: '"<function>"',
    29: '"<function>"',
    30: '{}',
    31: '"<function>"',
    32: '"$LOOP_UNROLL_0"',
    33: '"$LOOP_UNROLL_1"',
    34: '"$LOOP_UNROLL_2"',
    35: '"$LOOP_UNROLL_3"',
    36: '"$LOOP_UNROLL_4"',
    37: '"$LOOP_UNROLL_5"',
    38: '"$LOOP_UNROLL_6"',
    39: '"$LOOP_UNROLL_7"',
    40: '"$LOOP_UNROLL_8"',
    41: '"$LOOP_UNROLL_9"',
    42: '"$LOOP_UNROLL_10"',
  },

 - 10: 1
 - 11: 
  {
    0: '"<$>"',
    1: '"<function>"',
    2: '"<function>"',
    3: '"<$spy>"',
    4: '"<function>"',
    5: '"$LOOP_DONE_UNROLLING_ALWAYS_TRUE"',
    6: '[]',
    7: '"<function>"',
    8: '"<function>"',
    9: '"<function>"',
    10: '"<function>"',
    11: '"<function>"',
    12: '"<function>"',
    13: '"<function>"',
    14: '"<function>"',
    15: '"<function>"',
    16: '"<function>"',
    17: '{}',
    18: '"<function>"',
    19: '{}',
    20: '{}',
    21: '"<function>"',
    22: '{}',
    23: '"<function>"',
    24: '"<function>"',
    25: '"<function>"',
    26: '"<function>"',
    27: '"<function>"',
    28: '"<function>"',
    29: '"<function>"',
    30: '{}',
    31: '"<function>"',
    32: '"$LOOP_UNROLL_0"',
    33: '"$LOOP_UNROLL_1"',
    34: '"$LOOP_UNROLL_2"',
    35: '"$LOOP_UNROLL_3"',
    36: '"$LOOP_UNROLL_4"',
    37: '"$LOOP_UNROLL_5"',
    38: '"$LOOP_UNROLL_6"',
    39: '"$LOOP_UNROLL_7"',
    40: '"$LOOP_UNROLL_8"',
    41: '"$LOOP_UNROLL_9"',
    42: '"$LOOP_UNROLL_10"',
  },

 - 12: 1
 - 13: 
  {
    0: '"<$>"',
    1: '"<function>"',
    2: '"<function>"',
    3: '"<$spy>"',
    4: '"<function>"',
    5: '"$LOOP_DONE_UNROLLING_ALWAYS_TRUE"',
    6: '[]',
    7: '"<function>"',
    8: '"<function>"',
    9: '"<function>"',
    10: '"<function>"',
    11: '"<function>"',
    12: '"<function>"',
    13: '"<function>"',
    14: '"<function>"',
    15: '"<function>"',
    16: '"<function>"',
    17: '{}',
    18: '"<function>"',
    19: '{}',
    20: '{}',
    21: '"<function>"',
    22: '{}',
    23: '"<function>"',
    24: '"<function>"',
    25: '"<function>"',
    26: '"<function>"',
    27: '"<function>"',
    28: '"<function>"',
    29: '"<function>"',
    30: '{}',
    31: '"<function>"',
    32: '"$LOOP_UNROLL_0"',
    33: '"$LOOP_UNROLL_1"',
    34: '"$LOOP_UNROLL_2"',
    35: '"$LOOP_UNROLL_3"',
    36: '"$LOOP_UNROLL_4"',
    37: '"$LOOP_UNROLL_5"',
    38: '"$LOOP_UNROLL_6"',
    39: '"$LOOP_UNROLL_7"',
    40: '"$LOOP_UNROLL_8"',
    41: '"$LOOP_UNROLL_9"',
    42: '"$LOOP_UNROLL_10"',
  },

 - 14: 1
 - 15: 
  {
    0: '"<$>"',
    1: '"<function>"',
    2: '"<function>"',
    3: '"<$spy>"',
    4: '"<function>"',
    5: '"$LOOP_DONE_UNROLLING_ALWAYS_TRUE"',
    6: '[]',
    7: '"<function>"',
    8: '"<function>"',
    9: '"<function>"',
    10: '"<function>"',
    11: '"<function>"',
    12: '"<function>"',
    13: '"<function>"',
    14: '"<function>"',
    15: '"<function>"',
    16: '"<function>"',
    17: '{}',
    18: '"<function>"',
    19: '{}',
    20: '{}',
    21: '"<function>"',
    22: '{}',
    23: '"<function>"',
    24: '"<function>"',
    25: '"<function>"',
    26: '"<function>"',
    27: '"<function>"',
    28: '"<function>"',
    29: '"<function>"',
    30: '{}',
    31: '"<function>"',
    32: '"$LOOP_UNROLL_0"',
    33: '"$LOOP_UNROLL_1"',
    34: '"$LOOP_UNROLL_2"',
    35: '"$LOOP_UNROLL_3"',
    36: '"$LOOP_UNROLL_4"',
    37: '"$LOOP_UNROLL_5"',
    38: '"$LOOP_UNROLL_6"',
    39: '"$LOOP_UNROLL_7"',
    40: '"$LOOP_UNROLL_8"',
    41: '"$LOOP_UNROLL_9"',
    42: '"$LOOP_UNROLL_10"',
  },

 - 16: 1
 - 17: 
  {
    0: '"<$>"',
    1: '"<function>"',
    2: '"<function>"',
    3: '"<$spy>"',
    4: '"<function>"',
    5: '"$LOOP_DONE_UNROLLING_ALWAYS_TRUE"',
    6: '[]',
    7: '"<function>"',
    8: '"<function>"',
    9: '"<function>"',
    10: '"<function>"',
    11: '"<function>"',
    12: '"<function>"',
    13: '"<function>"',
    14: '"<function>"',
    15: '"<function>"',
    16: '"<function>"',
    17: '{}',
    18: '"<function>"',
    19: '{}',
    20: '{}',
    21: '"<function>"',
    22: '{}',
    23: '"<function>"',
    24: '"<function>"',
    25: '"<function>"',
    26: '"<function>"',
    27: '"<function>"',
    28: '"<function>"',
    29: '"<function>"',
    30: '{}',
    31: '"<function>"',
    32: '"$LOOP_UNROLL_0"',
    33: '"$LOOP_UNROLL_1"',
    34: '"$LOOP_UNROLL_2"',
    35: '"$LOOP_UNROLL_3"',
    36: '"$LOOP_UNROLL_4"',
    37: '"$LOOP_UNROLL_5"',
    38: '"$LOOP_UNROLL_6"',
    39: '"$LOOP_UNROLL_7"',
    40: '"$LOOP_UNROLL_8"',
    41: '"$LOOP_UNROLL_9"',
    42: '"$LOOP_UNROLL_10"',
  },

 - 18: 1
 - 19: 
  {
    0: '"<$>"',
    1: '"<function>"',
    2: '"<function>"',
    3: '"<$spy>"',
    4: '"<function>"',
    5: '"$LOOP_DONE_UNROLLING_ALWAYS_TRUE"',
    6: '[]',
    7: '"<function>"',
    8: '"<function>"',
    9: '"<function>"',
    10: '"<function>"',
    11: '"<function>"',
    12: '"<function>"',
    13: '"<function>"',
    14: '"<function>"',
    15: '"<function>"',
    16: '"<function>"',
    17: '{}',
    18: '"<function>"',
    19: '{}',
    20: '{}',
    21: '"<function>"',
    22: '{}',
    23: '"<function>"',
    24: '"<function>"',
    25: '"<function>"',
    26: '"<function>"',
    27: '"<function>"',
    28: '"<function>"',
    29: '"<function>"',
    30: '{}',
    31: '"<function>"',
    32: '"$LOOP_UNROLL_0"',
    33: '"$LOOP_UNROLL_1"',
    34: '"$LOOP_UNROLL_2"',
    35: '"$LOOP_UNROLL_3"',
    36: '"$LOOP_UNROLL_4"',
    37: '"$LOOP_UNROLL_5"',
    38: '"$LOOP_UNROLL_6"',
    39: '"$LOOP_UNROLL_7"',
    40: '"$LOOP_UNROLL_8"',
    41: '"$LOOP_UNROLL_9"',
    42: '"$LOOP_UNROLL_10"',
  },

 - 20: 1
 - 21: 
  {
    0: '"<$>"',
    1: '"<function>"',
    2: '"<function>"',
    3: '"<$spy>"',
    4: '"<function>"',
    5: '"$LOOP_DONE_UNROLLING_ALWAYS_TRUE"',
    6: '[]',
    7: '"<function>"',
    8: '"<function>"',
    9: '"<function>"',
    10: '"<function>"',
    11: '"<function>"',
    12: '"<function>"',
    13: '"<function>"',
    14: '"<function>"',
    15: '"<function>"',
    16: '"<function>"',
    17: '{}',
    18: '"<function>"',
    19: '{}',
    20: '{}',
    21: '"<function>"',
    22: '{}',
    23: '"<function>"',
    24: '"<function>"',
    25: '"<function>"',
    26: '"<function>"',
    27: '"<function>"',
    28: '"<function>"',
    29: '"<function>"',
    30: '{}',
    31: '"<function>"',
    32: '"$LOOP_UNROLL_0"',
    33: '"$LOOP_UNROLL_1"',
    34: '"$LOOP_UNROLL_2"',
    35: '"$LOOP_UNROLL_3"',
    36: '"$LOOP_UNROLL_4"',
    37: '"$LOOP_UNROLL_5"',
    38: '"$LOOP_UNROLL_6"',
    39: '"$LOOP_UNROLL_7"',
    40: '"$LOOP_UNROLL_8"',
    41: '"$LOOP_UNROLL_9"',
    42: '"$LOOP_UNROLL_10"',
  },

 - 22: 1
 - 23: 
  {
    0: '"<$>"',
    1: '"<function>"',
    2: '"<function>"',
    3: '"<$spy>"',
    4: '"<function>"',
    5: '"$LOOP_DONE_UNROLLING_ALWAYS_TRUE"',
    6: '[]',
    7: '"<function>"',
    8: '"<function>"',
    9: '"<function>"',
    10: '"<function>"',
    11: '"<function>"',
    12: '"<function>"',
    13: '"<function>"',
    14: '"<function>"',
    15: '"<function>"',
    16: '"<function>"',
    17: '{}',
    18: '"<function>"',
    19: '{}',
    20: '{}',
    21: '"<function>"',
    22: '{}',
    23: '"<function>"',
    24: '"<function>"',
    25: '"<function>"',
    26: '"<function>"',
    27: '"<function>"',
    28: '"<function>"',
    29: '"<function>"',
    30: '{}',
    31: '"<function>"',
    32: '"$LOOP_UNROLL_0"',
    33: '"$LOOP_UNROLL_1"',
    34: '"$LOOP_UNROLL_2"',
    35: '"$LOOP_UNROLL_3"',
    36: '"$LOOP_UNROLL_4"',
    37: '"$LOOP_UNROLL_5"',
    38: '"$LOOP_UNROLL_6"',
    39: '"$LOOP_UNROLL_7"',
    40: '"$LOOP_UNROLL_8"',
    41: '"$LOOP_UNROLL_9"',
    42: '"$LOOP_UNROLL_10"',
  },

 - 24: 1
 - 25: 
  {
    0: '"<$>"',
    1: '"<function>"',
    2: '"<function>"',
    3: '"<$spy>"',
    4: '"<function>"',
    5: '"$LOOP_DONE_UNROLLING_ALWAYS_TRUE"',
    6: '[]',
    7: '"<function>"',
    8: '"<function>"',
    9: '"<function>"',
    10: '"<function>"',
    11: '"<function>"',
    12: '"<function>"',
    13: '"<function>"',
    14: '"<function>"',
    15: '"<function>"',
    16: '"<function>"',
    17: '{}',
    18: '"<function>"',
    19: '{}',
    20: '{}',
    21: '"<function>"',
    22: '{}',
    23: '"<function>"',
    24: '"<function>"',
    25: '"<function>"',
    26: '"<function>"',
    27: '"<function>"',
    28: '"<function>"',
    29: '"<function>"',
    30: '{}',
    31: '"<function>"',
    32: '"$LOOP_UNROLL_0"',
    33: '"$LOOP_UNROLL_1"',
    34: '"$LOOP_UNROLL_2"',
    35: '"$LOOP_UNROLL_3"',
    36: '"$LOOP_UNROLL_4"',
    37: '"$LOOP_UNROLL_5"',
    38: '"$LOOP_UNROLL_6"',
    39: '"$LOOP_UNROLL_7"',
    40: '"$LOOP_UNROLL_8"',
    41: '"$LOOP_UNROLL_9"',
    42: '"$LOOP_UNROLL_10"',
  },

 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
