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

## Normalized

`````js filename=intro
function a() {
  const a$1 = {
    a() {
      return a$1;
    },
    b() {
      return a$1;
    },
    c() {
      return a$1;
    },
    d() {
      return a$1;
    },
  };
  return a$1;
}
const tmpCallCallee = $;
const tmpCallObj$1 = a();
const tmpCallObj = tmpCallObj$1.b();
const tmpCompObj = tmpCallObj.c();
const tmpCalleeParam = tmpCompObj.d;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function a() {
  const a$1 = {
    a() {
      return a$1;
    },
    b() {
      return a$1;
    },
    c() {
      return a$1;
    },
    d() {
      return a$1;
    },
  };
  return a$1;
}
const tmpCallObj$1 = a();
const tmpCallObj = tmpCallObj$1.b();
const tmpCompObj = tmpCallObj.c();
const tmpCalleeParam = tmpCompObj.d;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
