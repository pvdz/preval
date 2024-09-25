# Preval test case

# with_ident_exportvar.md

> Object literal > Inlining > With ident exportvar
>
>

## Input

`````js filename=intro
import e from 'xyz';
const obj = {f: e};
$(obj.f);
`````

`````js filename=xyz
$('nope');
`````

## Pre Normal


`````js filename=intro
import e from 'xyz';
const obj = { f: e };
$(obj.f);
`````

`````js filename=xyz
$(`nope`);
`````

## Normalized


`````js filename=intro
import { default as e } from 'xyz';
const obj = { f: e };
const tmpCallCallee = $;
const tmpCalleeParam = obj.f;
tmpCallCallee(tmpCalleeParam);
`````

`````js filename=xyz
$(`nope`);
`````

## Output


`````js filename=intro
import { default as e } from 'xyz';
$(e);
`````

`````js filename=xyz
$(`nope`);
`````

## PST Output

With rename=true

`````js filename=intro
import { default as e } from "xyz";
$( e );
`````

`````js filename=xyz
import { default as e } from "xyz";
$( e );
`````

## Globals

BAD@! Found 1 implicit global bindings:

e

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot use import statement outside a module ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
