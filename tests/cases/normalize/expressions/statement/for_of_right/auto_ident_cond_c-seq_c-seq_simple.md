# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Statement > For of right > Auto ident cond c-seq c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (10, 20, $(30)) ? (40, 50, $(60)) : $($(100)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (10, 20, $(30)) ? (40, 50, $(60)) : $($(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpForOfDeclRhs = undefined;
const tmpIfTest = $(30);
if (tmpIfTest) {
  tmpForOfDeclRhs = $(60);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpForOfDeclRhs = tmpCallCallee(tmpCalleeParam);
}
let x = undefined;
for (x of tmpForOfDeclRhs) {
}
$(a);
`````

## Output

`````js filename=intro
let tmpForOfDeclRhs = undefined;
const tmpIfTest = $(30);
if (tmpIfTest) {
  tmpForOfDeclRhs = $(60);
} else {
  const tmpCalleeParam = $(100);
  tmpForOfDeclRhs = $(tmpCalleeParam);
}
let x = undefined;
for (x of tmpForOfDeclRhs) {
}
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30
 - 2: 60
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
