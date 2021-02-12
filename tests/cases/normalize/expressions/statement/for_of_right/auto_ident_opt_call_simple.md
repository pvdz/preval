# Preval test case

# auto_ident_opt_call_simple.md

> normalize > expressions > statement > for_of_right > auto_ident_opt_call_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of $?.(1));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpForOfDeclRhs = undefined;
  const tmpChainRootCall = $;
  if (tmpChainRootCall) {
    const tmpChainElementCall = tmpChainRootCall(1);
    tmpForOfDeclRhs = tmpChainElementCall;
  }
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpForOfDeclRhs = undefined;
  const tmpChainRootCall = $;
  if (tmpChainRootCall) {
    const tmpChainElementCall = tmpChainRootCall(1);
    tmpForOfDeclRhs = tmpChainElementCall;
  }
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
