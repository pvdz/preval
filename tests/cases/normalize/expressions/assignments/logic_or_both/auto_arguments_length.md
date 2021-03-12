# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > Logic or both > Auto arguments length
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = arguments) || (a = arguments));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = arguments) || (a = arguments));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = arguments;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  a = arguments;
  tmpCalleeParam = arguments;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let SSA_a = arguments;
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
} else {
  SSA_a = arguments;
  tmpCalleeParam = arguments;
}
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 0: '"<$>"', 1: '"<function>"' }
 - 2: { 0: '"<$>"', 1: '"<function>"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
