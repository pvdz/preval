# Preval test case

# with_ident_catchvar.md

> Object literal > Inlining > With ident catchvar
>
>

## Input

`````js filename=intro
try {
  if ($(true)) {
    throw 'fail';
  }
} catch (e) {
  const obj = {f: e};
  $(obj.f);
}
`````

## Pre Normal


`````js filename=intro
try {
  if ($(true)) {
    throw `fail`;
  }
} catch (e) {
  const obj = { f: e };
  $(obj.f);
}
`````

## Normalized


`````js filename=intro
try {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    throw `fail`;
  } else {
  }
} catch (e) {
  const obj = { f: e };
  const tmpCallCallee = $;
  const tmpCalleeParam = obj.f;
  tmpCallCallee(tmpCalleeParam);
}
`````

## Output


`````js filename=intro
try {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    throw `fail`;
  } else {
  }
} catch (e) {
  $(e);
}
`````

## PST Output

With rename=true

`````js filename=intro
try {
  const a = $( true );
  if (a) {
    throw "fail";
  }
}
catch (b) {
  $( b );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'fail'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
