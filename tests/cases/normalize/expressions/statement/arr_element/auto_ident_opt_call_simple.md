# Preval test case

# auto_ident_opt_call_simple.md

> normalize > expressions > statement > arr_element > auto_ident_opt_call_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$?.(1) + $?.(1);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpChainRootCall = $;
if (tmpChainRootCall) {
  const tmpChainElementCall = tmpChainRootCall(1);
}
const tmpChainRootCall$1 = $;
if (tmpChainRootCall$1) {
  const tmpChainElementCall$1 = tmpChainRootCall$1(1);
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
if ($) {
  const tmpChainElementCall = $(1);
}
if ($) {
  const tmpChainElementCall$1 = $(1);
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same