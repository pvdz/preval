# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Bindings > Stmt global top > Auto pattern obj complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let { a } = $({ a: 1, b: 2 });
$(a);
`````

## Pre Normal


`````js filename=intro
let { a: a } = $({ a: 1, b: 2 });
$(a);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = { a: 1, b: 2 };
let bindingPatternObjRoot = tmpCallCallee(tmpCalleeParam);
let a = bindingPatternObjRoot.a;
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = { a: 1, b: 2 };
const bindingPatternObjRoot = $(tmpCalleeParam);
const a = bindingPatternObjRoot.a;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = $( a );
const c = b.a;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
