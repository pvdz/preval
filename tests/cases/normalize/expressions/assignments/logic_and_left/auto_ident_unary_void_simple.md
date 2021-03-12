# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Assignments > Logic and left > Auto ident unary void simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$((a = void arg) && $(100));
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$((a = void arg) && $(100));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  tmpCalleeParam = $(100);
}
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
let tmpCalleeParam = undefined;
if (tmpCalleeParam) {
  tmpCalleeParam = $(100);
}
$(tmpCalleeParam);
$(undefined, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: undefined, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
