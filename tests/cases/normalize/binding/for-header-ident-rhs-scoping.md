# Preval test case

# for-header-rhs-scoping.md

> normalize > binding > for-header-rhs-scoping
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

## Normalized

`````js filename=intro
let x = 1;
let y = 1;
{
  const tmpForInDeclRhs = [x_1];
  let x_1;
  for (x_1 in tmpForInDeclRhs) {
    let y_1 = 2;
    $(x_1);
  }
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
