# Preval test case

# auto_ident_delete_prop_s-seq.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident delete prop s-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let arg = { y: 1 };

    let a = delete ($(1), $(2), arg).y;
    $(a, arg);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    let arg = { y: 1 };
    let a = delete ($(1), $(2), arg).y;
    $(a, arg);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let arg = { y: 1 };
  $(1);
  $(2);
  const tmpDeleteObj = arg;
  let a = delete tmpDeleteObj.y;
  $(a, arg);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(1);
$(2);
const arg = { y: 1 };
const a = delete arg.y;
$(a, arg);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = { y: 1 };
const b = deletea.y;
$( b, a );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: true, {}
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
