# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > For of right > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of $($(1)) && $($(1)) && $($(2)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpForOfDeclRhs = tmpCallCallee(tmpCalleeParam);
if (tmpForOfDeclRhs) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpForOfDeclRhs = tmpCallCallee$1(tmpCalleeParam$1);
  if (tmpForOfDeclRhs) {
    const tmpCallCallee$2 = $;
    const tmpCalleeParam$2 = $(2);
    tmpForOfDeclRhs = tmpCallCallee$2(tmpCalleeParam$2);
  }
}
let x;
for (x of tmpForOfDeclRhs) {
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = $(1);
let tmpForOfDeclRhs = $(tmpCalleeParam);
if (tmpForOfDeclRhs) {
  const tmpCalleeParam$1 = $(1);
  tmpForOfDeclRhs = $(tmpCalleeParam$1);
  if (tmpForOfDeclRhs) {
    const tmpCalleeParam$2 = $(2);
    tmpForOfDeclRhs = $(tmpCalleeParam$2);
  }
}
let x;
for (x of tmpForOfDeclRhs) {
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
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
