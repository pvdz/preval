# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > Logic and right > Auto arguments length
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) && (a = arguments));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) && (a = arguments));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  a = arguments;
  tmpCalleeParam = arguments;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  a = arguments;
  arguments;
  $(arguments);
} else {
  $(tmpCalleeParam);
}
$(a);
`````

## Globals

BAD@! Found 1 implicit global bindings:

arguments

## Result

Should call `$` with:
 - 1: 100
 - 2: 
  {
    0: '"<$>"',
    1: '"<function>"',
    2: '"<function>"',
    3: '"<$spy>"',
    4: '"<function>"',
    5: '[]',
    6: '"<function>"',
    7: '{}',
    8: '{}',
    9: '{}',
  },

 - 3: 
  {
    0: '"<$>"',
    1: '"<function>"',
    2: '"<function>"',
    3: '"<$spy>"',
    4: '"<function>"',
    5: '[]',
    6: '"<function>"',
    7: '{}',
    8: '{}',
    9: '{}',
  },

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
