# Preval test case

# global_call_ident.md

> Normalize > Optional > Global call ident
>
> Ident property access should not be changed

## Input

`````js filename=intro
$?.(15);
`````

## Pre Normal

`````js filename=intro
$?.(15);
`````

## Normalized

`````js filename=intro
const tmpChainRootCall = $;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall(15);
} else {
}
`````

## Output

`````js filename=intro
const tmpIfTest = $ != null;
if (tmpIfTest) {
  $(15);
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 15
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
