# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Return > Auto this
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = this);
}
$(f());
$(a);

//*/// (end of file artifact)
`````

## Pre Normal


`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  return (a = tmpPrevalAliasThis);
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized


`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  a = tmpPrevalAliasThis;
  return a;
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
$(undefined);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
