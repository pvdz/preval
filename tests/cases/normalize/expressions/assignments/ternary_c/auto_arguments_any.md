# Preval test case

# auto_arguments_any.md

> Normalize > Expressions > Assignments > Ternary c > Auto arguments any
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = arguments));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = arguments));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  a = arguments;
  tmpCalleeParam = arguments;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  a = arguments;
  tmpCalleeParam = arguments;
}
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: { 0: '"<$>"', 1: '"<function>"' }
 - 3: { 0: '"<$>"', 1: '"<function>"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
