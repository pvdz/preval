# Preval test case

# for-header-rhs-scoping.md

> normalize > binding > for-header-rhs-scoping
>
> The RHS of a for-of and for-in are scoped to the special for-header scope, not the scope that wraps the statement. As such, the `x` is tdz'd and it the `[x,y]` part should result in a runtime tdz error over accessing `x`.

#TODO

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
  const tmpForInDeclRhs = [x];
  let tmpForInDeclLhs;
  let x;
  for (tmpForInDeclLhs in tmpForInDeclRhs) {
    x = tmpForInDeclLhs;
    {
      let y_1 = 2;
      $(x);
    }
  }
}
`````

## Output

`````js filename=intro
let x = 1;
const tmpForInDeclRhs = [x];
let tmpForInDeclLhs;
let x;
for (tmpForInDeclLhs in tmpForInDeclRhs) {
  x = tmpForInDeclLhs;
  $(x);
}
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot access 'x' before initialization ]>

Normalized calls: Same

Final output calls: BAD!!
["<crash[ Identifier 'x' has already been declared ]>"];

