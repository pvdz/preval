# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> normalize > expressions > statement > for_of_right > auto_ident_opt_method_opt_call_extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
for (let x of b?.c.d.e?.(1));
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
{
  let tmpForOfDeclRhs = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.c;
    const tmpChainElementObject$1 = tmpChainElementObject.d;
    const tmpChainElementObject$2 = tmpChainElementObject$1.e;
    const tmpIfTest$1 = tmpChainElementObject$2 != null;
    if (tmpIfTest$1) {
      const tmpChainElementCall = tmpChainElementObject$2.call(tmpChainElementObject$1, 1);
      tmpForOfDeclRhs = tmpChainElementCall;
    }
  }
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
{
  let tmpForOfDeclRhs = undefined;
  const tmpIfTest = b != null;
  if (tmpIfTest) {
    const tmpChainElementObject = b.c;
    const tmpChainElementObject$1 = tmpChainElementObject.d;
    const tmpChainElementObject$2 = tmpChainElementObject$1.e;
    const tmpIfTest$1 = tmpChainElementObject$2 != null;
    if (tmpIfTest$1) {
      const tmpChainElementCall = tmpChainElementObject$2.call(tmpChainElementObject$1, 1);
      tmpForOfDeclRhs = tmpChainElementCall;
    }
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
