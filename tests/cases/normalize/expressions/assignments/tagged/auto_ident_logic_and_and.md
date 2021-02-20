# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Assignments > Tagged > Auto ident logic and and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = $($(1)) && $($(1)) && $($(2)))} after`;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
const tmpCallCallee$1 = $;
const tmpCalleeParam$2 = $(1);
a = tmpCallCallee$1(tmpCalleeParam$2);
if (a) {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$3 = $(1);
  a = tmpCallCallee$2(tmpCalleeParam$3);
}
if (a) {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$4 = $(2);
  a = tmpCallCallee$3(tmpCalleeParam$4);
}
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = ['before ', ' after'];
const tmpCalleeParam$2 = $(1);
let SSA_a = $(tmpCalleeParam$2);
if (SSA_a) {
  const tmpCalleeParam$3 = $(1);
  SSA_a = $(tmpCalleeParam$3);
}
if (SSA_a) {
  const tmpCalleeParam$4 = $(2);
  SSA_a = $(tmpCalleeParam$4);
}
const tmpCalleeParam$1 = SSA_a;
$(tmpCalleeParam, tmpCalleeParam$1);
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
 - 7: ['before ', ' after'], 2
 - 8: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
