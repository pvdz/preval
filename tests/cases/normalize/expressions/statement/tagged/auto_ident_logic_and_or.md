# Preval test case

# auto_ident_logic_and_or.md

> normalize > expressions > statement > tagged > auto_ident_logic_and_or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${($($(1)) && $($(1))) || $($(2))} after`;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
const tmpCallCallee$1 = $;
const tmpCalleeParam$2 = $(1);
let tmpCalleeParam$1 = tmpCallCallee$1(tmpCalleeParam$2);
if (tmpCalleeParam$1) {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$3 = $(1);
  tmpCalleeParam$1 = tmpCallCallee$2(tmpCalleeParam$3);
}
if (tmpCalleeParam$1) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$4 = $(2);
  tmpCalleeParam$1 = tmpCallCallee$3(tmpCalleeParam$4);
}
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = ['before ', ' after'];
const tmpCalleeParam$2 = $(1);
let tmpCalleeParam$1 = $(tmpCalleeParam$2);
if (tmpCalleeParam$1) {
  const tmpCalleeParam$3 = $(1);
  tmpCalleeParam$1 = $(tmpCalleeParam$3);
}
if (tmpCalleeParam$1) {
} else {
  const tmpCalleeParam$4 = $(2);
  tmpCalleeParam$1 = $(tmpCalleeParam$4);
}
$(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: ['before ', ' after'], 1
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same