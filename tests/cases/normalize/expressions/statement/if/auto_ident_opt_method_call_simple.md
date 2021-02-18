# Preval test case

# auto_ident_opt_method_call_simple.md

> normalize > expressions > statement > if > auto_ident_opt_method_call_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
if (b?.c(1));
$(a);
`````

## Normalized

`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpChainRootProp = b;
const tmpIfTest$1 = tmpChainRootProp != null;
if (tmpIfTest$1) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementCall = tmpChainElementObject.call(tmpChainRootProp, 1);
  tmpIfTest = tmpChainElementCall;
}
$(a);
`````

## Output

`````js filename=intro
const b = { c: $ };
const a = { a: 999, b: 1000 };
const tmpIfTest$1 = b != null;
if (tmpIfTest$1) {
  const tmpChainElementObject = b.c;
  tmpChainElementObject.call(b, 1);
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

Normalized calls: Same

Final output calls: Same
