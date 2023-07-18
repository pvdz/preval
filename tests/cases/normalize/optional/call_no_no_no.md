# Preval test case

# call_no_no_no.md

> Normalize > Optional > Call no no no
>
> Mix optional with regular member call

#TODO

## Input

`````js filename=intro
function a() {
  const a = {
    a(){ return a; },
    b(){ return a; },
    c(){ return a; },
    d(){ return a; }
  };

  return a;
}
$(a().b().c().d);
`````

## Pre Normal

`````js filename=intro
let a = function () {
  debugger;
  const a$1 = {
    a() {
      debugger;
      return a$1;
    },
    b() {
      debugger;
      return a$1;
    },
    c() {
      debugger;
      return a$1;
    },
    d() {
      debugger;
      return a$1;
    },
  };
  return a$1;
};
$(a().b().c().d);
`````

## Normalized

`````js filename=intro
let a = function () {
  debugger;
  const a$1 = {
    a() {
      debugger;
      return a$1;
    },
    b() {
      debugger;
      return a$1;
    },
    c() {
      debugger;
      return a$1;
    },
    d() {
      debugger;
      return a$1;
    },
  };
  return a$1;
};
const tmpCallCallee = $;
const tmpCallObj$1 = a();
const tmpCallObj = tmpCallObj$1.b();
const tmpCompObj = tmpCallObj.c();
const tmpCalleeParam = tmpCompObj.d;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const a$1 = {
  a() {
    debugger;
    return a$1;
  },
  b() {
    debugger;
    return a$1;
  },
  c() {
    debugger;
    return a$1;
  },
  d() {
    debugger;
    return a$1;
  },
};
const tmpCallObj = a$1.b();
const tmpCompObj = tmpCallObj.c();
const tmpCalleeParam = tmpCompObj.d;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a(  ) {
    debugger;
    return a;
  },,
b(  ) {
    debugger;
    return a;
  },,
c(  ) {
    debugger;
    return a;
  },,
d(  ) {
    debugger;
    return a;
  },
;
const b = a.b();
const c = b.c();
const d = c.d;
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
