# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Assignments > Objlit spread > Auto ident logic or complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ ...(a = $($(0)) || $($(2))) });
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ ...(a = $($(0)) || $($(2))) });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(0);
a = tmpCallCallee$1(tmpCalleeParam$1);
if (a) {
} else {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(2);
  a = tmpCallCallee$2(tmpCalleeParam$2);
}
let tmpObjSpread = a;
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = $(0);
let SSA_a = $(tmpCalleeParam$1);
if (SSA_a) {
} else {
  const tmpCalleeParam$2 = $(2);
  SSA_a = $(tmpCalleeParam$2);
}
const tmpObjSpread = SSA_a;
const tmpCalleeParam = { ...tmpObjSpread };
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: {}
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
