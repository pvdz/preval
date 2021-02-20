# Preval test case

# global_call_ident.md

> Normalize > Optional > Global call ident
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
  $(15);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 15
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
