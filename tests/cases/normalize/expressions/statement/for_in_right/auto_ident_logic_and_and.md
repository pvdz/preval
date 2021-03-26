# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > For in right > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in $($(1)) && $($(1)) && $($(2)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in $($(1)) && $($(1)) && $($(2)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpForInDeclRhs = tmpCallCallee(tmpCalleeParam);
if (tmpForInDeclRhs) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpForInDeclRhs = tmpCallCallee$1(tmpCalleeParam$1);
  if (tmpForInDeclRhs) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    tmpForInDeclRhs = tmpCallCallee$3(tmpCalleeParam$3);
  }
}
let x;
for (x in tmpForInDeclRhs) {
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = $(1);
let tmpForInDeclRhs = $(tmpCalleeParam);
if (tmpForInDeclRhs) {
  const tmpCalleeParam$1 = $(1);
  tmpForInDeclRhs = $(tmpCalleeParam$1);
  if (tmpForInDeclRhs) {
    const tmpCalleeParam$3 = $(2);
    tmpForInDeclRhs = $(tmpCalleeParam$3);
  }
}
let x;
for (x in tmpForInDeclRhs) {
}
$(a);
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
 - 7: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
