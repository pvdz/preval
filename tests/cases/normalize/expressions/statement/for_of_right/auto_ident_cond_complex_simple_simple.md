# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Statement > For of right > Auto ident cond complex simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of $(1) ? 2 : $($(100)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of $(1) ? 2 : $($(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpForOfDeclRhs = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpForOfDeclRhs = 2;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpForOfDeclRhs = tmpCallCallee(tmpCalleeParam);
}
let x;
for (x of tmpForOfDeclRhs) {
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
let tmpForOfDeclRhs = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpForOfDeclRhs = 2;
} else {
  const tmpCalleeParam = $(100);
  tmpForOfDeclRhs = $(tmpCalleeParam);
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
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
