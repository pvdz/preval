# Preval test case

# param_is_catch_var.md

> Static arg ops > Assignment > Param is catch var
>
> 

#TODO

## Input

`````js filename=intro
try {
  $(1);
  throw 'foo';
} catch (a) {
  let f = (b) => {
    b = a;
    $(a, b);
  }

  f(11);
  f(12);
  $(a);
}
$(3);
`````

## Pre Normal


`````js filename=intro
try {
  $(1);
  throw `foo`;
} catch (a) {
  let f = ($$0) => {
    let b = $$0;
    debugger;
    b = a;
    $(a, b);
  };
  f(11);
  f(12);
  $(a);
}
$(3);
`````

## Normalized


`````js filename=intro
try {
  $(1);
  throw `foo`;
} catch (a) {
  let f = function ($$0) {
    let b = $$0;
    debugger;
    b = a;
    $(a, b);
    return undefined;
  };
  f(11);
  f(12);
  $(a);
}
$(3);
`````

## Output


`````js filename=intro
try {
  $(1);
  throw `foo`;
} catch (a) {
  $(a, a);
  $(a, a);
  $(a);
}
$(3);
`````

## PST Output

With rename=true

`````js filename=intro
try {
  $( 1 );
  throw "foo";
}
catch (a) {
  $( a, a );
  $( a, a );
  $( a );
}
$( 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'foo', 'foo'
 - 3: 'foo', 'foo'
 - 4: 'foo'
 - 5: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
