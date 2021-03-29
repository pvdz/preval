# Preval test case

# for-header-ident-rhs-scoping.md

> Normalize > Binding > For-header-ident-rhs-scoping
>
> The RHS of a for-of and for-in are scoped to the special for-header scope, not the scope that wraps the statement. As such, the `x` is tdz'd and it the `[x,y]` part should result in a runtime tdz error over accessing `x`.

This should crash during eval

## Input

`````js filename=intro
let x = 1;
let y = 1;
for (let x in [x]) {
  let y = 2;
  $(x);
}
`````

## Pre Normal

`````js filename=intro
let x = 1;
let y = 1;
for (let x$1 in [x$1]) {
  let y$1 = 2;
  $(x$1);
}
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 1;
const tmpForInDeclRhs = [x$1];
let x$1 = undefined;
for (x$1 in tmpForInDeclRhs) {
  let y$1 = 2;
  $(x$1);
}
`````

## Output

`````js filename=intro
const tmpForInDeclRhs = [x$1];
let x$1 = undefined;
for (x$1 in tmpForInDeclRhs) {
  $(x$1);
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
