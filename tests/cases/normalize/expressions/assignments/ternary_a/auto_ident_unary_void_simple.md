# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident unary void simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$((a = void arg) ? $(100) : $(200));
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$((a = void arg) ? $(100) : $(200));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
a = undefined;
let tmpIfTest = a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
const tmpClusterSSA_tmpCalleeParam$1 = $(200);
$(tmpClusterSSA_tmpCalleeParam$1);
$(undefined, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 200
 - 2: 200
 - 3: undefined, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
