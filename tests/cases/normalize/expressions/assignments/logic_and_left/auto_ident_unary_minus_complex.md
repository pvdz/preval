# Preval test case

# auto_ident_unary_minus_complex.md

> Normalize > Expressions > Assignments > Logic and left > Auto ident unary minus complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = -$(100)) && $(100));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = -$(100)) && $(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpUnaryArg = $(100);
a = -tmpUnaryArg;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  tmpCalleeParam = $(100);
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
const a = -tmpUnaryArg;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  tmpCalleeParam = $(100);
} else {
}
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 100
 - 4: -100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
