# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto this
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = this).a;
$(a);

//*/// (end of file artifact)
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
a = this;
let tmpCompObj = a;
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
const SSA_a = this;
SSA_a.a;
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
