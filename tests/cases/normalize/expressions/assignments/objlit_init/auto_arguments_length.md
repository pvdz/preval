# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > Objlit init > Auto arguments length
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = arguments) });
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = arguments) });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = arguments;
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const a = arguments;
const tmpCalleeParam = { x: a };
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = arguments;
const b = { x: a };
$( b );
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

arguments

## Result

Should call `$` with:
 - 1: 
  {
    x:
      '{"0":"\\"<$>\\"","1":"\\"<function>\\"","2":"\\"<function>\\"","3":"\\"<$spy>\\"","4":"\\"<function>\\"","5":"\\"$LOOP_DONE_UNROLLING_ALWAYS_TRUE\\"","6":"[]","7":"\\"<function>\\"","8":"\\"<function>\\"","9":"\\"<function>\\"","10":"\\"<function>\\"","11":"\\"<function>\\"","12":"\\"<function>\\"","13":"\\"<function>\\"","14":"\\"<function>\\"","15":"\\"<function>\\"","16":"\\"<function>\\"","17":"{}","18":"\\"<function>\\"","19":"{}","20":"{}","21":"\\"<function>\\"","22":"{}","23":"\\"<function>\\"","24":"\\"<function>\\"","25":"\\"<function>\\"","26":"\\"<function>\\"","27":"\\"<function>\\"","28":"\\"<function>\\"","29":"\\"<function>\\"","30":"{}","31":"\\"<function>\\"","32":"\\"$LOOP_UNROLL_0\\"","33":"\\"$LOOP_UNROLL_1\\"","34":"\\"$LOOP_UNROLL_2\\"","35":"\\"$LOOP_UNROLL_3\\"","36":"\\"$LOOP_UNROLL_4\\"","37":"\\"$LOOP_UNROLL_5\\"","38":"\\"$LOOP_UNROLL_6\\"","39":"\\"$LOOP_UNROLL_7\\"","40":"\\"$LOOP_UNROLL_8\\"","41":"\\"$LOOP_UNROLL_9\\"","42":"\\"$LOOP_UNROLL_10\\""}',
  },

 - 2: 
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

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
