# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Call spread > Auto this
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = this));
$(a);

//*/// (end of file artifact)
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = this;
let tmpCalleeParamSpread = a;
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output

`````js filename=intro
const SSA_a = this;
$(...SSA_a);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
