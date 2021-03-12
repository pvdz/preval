# Preval test case

# auto_ident_unary_excl_simple.md

> Normalize > Expressions > Assignments > Logic or left > Auto ident unary excl simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$((a = !arg) || $(100));
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$((a = !arg) || $(100));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = !arg;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  tmpCalleeParam = $(100);
}
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
let tmpCalleeParam = false;
if (tmpCalleeParam) {
} else {
  tmpCalleeParam = $(100);
}
$(tmpCalleeParam);
$(false, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: false, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
