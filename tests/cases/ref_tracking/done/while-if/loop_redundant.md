# Preval test case

# loop_redundant.md

> Ref tracking > Done > While-if > Loop redundant
>
> Both strings should be replaced with an empty string (or a custom string indicating they can't be observed)

## Options

- refTest

## Input

`````js filename=intro
if ($) {
  let a = "jhayon.vercel.app"; // never observed, overwritten inside the loop
  let b = "jhayon.vercel.app"; // never observed, overwritten in both branches in the loop
  let c = 1;
  const d = $( "x" );
  while ($LOOP_UNROLL_500) {
    a = d.slice(0);
    const e = a[ 0 ];
    const f = e === ".";
    if (f) {
      b = a.slice( 1 );
    }
    else {
      b = a;
    }
    const h = b.length;
    $(h)
    c = c + 1;
    if (c > 10) break;
  }
}
`````

## Output

(Annotated with pids)

`````filename=intro
if ($) {
  /*4*/ let a___7__ = `jhayon.vercel.app`;
  let b___12__ = `jhayon.vercel.app`;
  let c___17__ = 1;
  const d___21__ = $(`x`);
  while ($LOOP_UNROLL_500___27__) {
    /*28*/ a___36__ = d___33__.slice___34__(0);
    const e___39__ = a___41__[0];
    const f___45__ = e___47__ === `.`;
    if (f___51__) {
      /*52*/ b___60__ = a___57__.slice___58__(1);
    } /*61*/ else {
      b___65__ = a___64__;
    }
    const h___68__ = b___70__.length___71__;
    $(h___75__);
    c___81__ = c___79__ + 1;
    const tmpIfTest___84__ = c___86__ > 10;
    if (tmpIfTest___89__) {
      /*90*/ break;
    } /*92*/ else {
    }
  }
} /*93*/ else {
}
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
a:
  - w @7       | ########## | not read    | none           | none
  - w @36      | ########## | 41          | none           | none
  - r @41      | 36
  - r @57      | none (TDZ?)
  - r @64      | none (TDZ?)

b:
  - w @12      | ########## | not read    | none           | none
  - w @60      | ########## | not read    | none           | none
  - w @65      | ########## | not read    | none           | none
  - r @70      | none (TDZ?)

c:
  - w @17      | ########## | not read    | none           | none
  - r @79      | none (TDZ?)
  - w @81      | ########## | 86          | none           | none
  - r @86      | 81

d:
  - w @21      | ########## | not read    | none           | none
  - r @33      | none (TDZ?)

e:
  - w @39      | ########## | 47          | none           | none
  - r @47      | 39

f:
  - w @45      | ########## | 51          | none           | none
  - r @51      | 45

h:
  - w @68      | ########## | 75          | none           | none
  - r @75      | 68

tmpIfTest:
  - w @84      | ########## | 89          | none           | none
  - r @89      | 84
