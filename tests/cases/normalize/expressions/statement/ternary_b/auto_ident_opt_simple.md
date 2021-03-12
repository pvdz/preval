# Preval test case

# auto_ident_opt_simple.md

> Normalize > Expressions > Statement > Ternary b > Auto ident opt simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(1) ? b?.x : $(200);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(1) ? b?.x : $(200);
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpChainRootProp = b;
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainRootProp.x;
  }
} else {
  $(200);
}
$(a);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 = b != null;
  if (tmpIfTest$1) {
    b.x;
  }
} else {
  $(200);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
