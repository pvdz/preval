# Preval test case

# global_call_prop.md

> normalize > member_access > global_call_prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
$?.(15);
`````

## Normalized

`````js filename=intro
const tmpChainRootCall = $;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall(15);
}
`````

## Output

`````js filename=intro
const tmpIfTest = $ != null;
if (tmpIfTest) {
  const tmpChainElementCall = $(15);
}
`````

## Result

Should call `$` with:
 - 1: 15
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
