# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Assignments > Logic and left > Auto ident array complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = [$(1), 2, $(3)]) && $(100));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = [$(1), 2, $(3)]) && $(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$2 = $(3);
a = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  tmpCalleeParam = $(100);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpArrElement = $(1);
const tmpArrElement$2 = $(3);
const SSA_a = [tmpArrElement, 2, tmpArrElement$2];
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
  tmpCalleeParam = $(100);
}
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 100
 - 4: 100
 - 5: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
