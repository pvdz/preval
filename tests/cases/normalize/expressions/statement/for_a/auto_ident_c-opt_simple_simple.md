# Preval test case

# auto_ident_c-opt_simple_simple.md

> Normalize > Expressions > Statement > For a > Auto ident c-opt simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (b?.["x"]; $(0); );
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  b?.[`x`];
  while ($(0)) {}
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainRootComputed = `x`;
  const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
} else {
}
let tmpIfTest$1 = $(0);
while (tmpIfTest$1) {
  tmpIfTest$1 = $(0);
}
$(a);
`````

## Output

`````js filename=intro
let tmpIfTest$1 = $(0);
while (tmpIfTest$1) {
  tmpIfTest$1 = $(0);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
