# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Assignments > Objlit spread > Auto ident logic and and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ ...(a = $($(1)) && $($(1)) && $($(2))) });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(1);
a = tmpCallCallee$1(tmpCalleeParam$1);
if (a) {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(1);
  a = tmpCallCallee$2(tmpCalleeParam$2);
}
if (a) {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(2);
  a = tmpCallCallee$3(tmpCalleeParam$3);
}
let tmpObjSpread = a;
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = $(1);
let SSA_a = $(tmpCalleeParam$1);
if (SSA_a) {
  const tmpCalleeParam$2 = $(1);
  SSA_a = $(tmpCalleeParam$2);
}
if (SSA_a) {
  const tmpCalleeParam$3 = $(2);
  SSA_a = $(tmpCalleeParam$3);
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
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: {}
 - 8: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
