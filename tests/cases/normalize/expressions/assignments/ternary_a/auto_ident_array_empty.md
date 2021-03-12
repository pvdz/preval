# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident array empty
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = []) ? $(100) : $(200));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = []) ? $(100) : $(200));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
a = [];
let tmpIfTest = a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let tmpCalleeParam = undefined;
const SSA_a = [];
if (SSA_a) {
  tmpCalleeParam = $(100);
} else {
  tmpCalleeParam = $(200);
}
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
