# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Statement > For in right > Auto ident logic and simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in 1 && $($(1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in 1 && $($(1)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpForInDeclRhs = 1;
if (tmpForInDeclRhs) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  tmpForInDeclRhs = tmpCallCallee(tmpCalleeParam);
} else {
}
let x = undefined;
for (x in tmpForInDeclRhs) {
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
let tmpForInDeclRhs = 1;
if (tmpForInDeclRhs) {
  const tmpCalleeParam = $(1);
  tmpForInDeclRhs = $(tmpCalleeParam);
} else {
}
let x = undefined;
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
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
