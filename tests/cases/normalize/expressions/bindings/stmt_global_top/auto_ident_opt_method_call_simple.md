# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident opt method call simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: $ };

let a = b?.c(1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { c: $ };
let a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementCall = tmpChainElementObject.call(tmpChainRootProp, 1);
  a = tmpChainElementCall;
}
$(a);
`````

## Output

`````js filename=intro
const b = { c: $ };
let a = undefined;
const tmpIfTest = b != null;
if (tmpIfTest) {
  const tmpChainElementObject = b.c;
  const tmpChainElementCall = tmpChainElementObject.call(b, 1);
  a = tmpChainElementCall;
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
