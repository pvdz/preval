# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Logic or left > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = void $(100)) || $(100));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = void $(100)) || $(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
$(100);
a = undefined;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  tmpCalleeParam = $(100);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
$(100);
let tmpCalleeParam = undefined;
if (tmpCalleeParam) {
} else {
  tmpCalleeParam = $(100);
}
$(tmpCalleeParam);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 100
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
