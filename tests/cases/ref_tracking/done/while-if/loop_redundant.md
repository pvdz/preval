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
  /*4*/ let a___10__ = `jhayon.vercel.app`;
  let b___14__ = `jhayon.vercel.app`;
  let c___18__ = 1;
  const d___21__ = $(`x`);
  while ($LOOP_UNROLL_500___27__) {
    /*28*/ a___40__ = d___37__.slice___38__(0);
    const e___42__ = a___44__[0];
    const f___47__ = e___49__ === `.`;
    if (f___53__) {
      /*54*/ b___62__ = a___59__.slice___60__(1);
    } /*63*/ else {
      b___67__ = a___66__;
    }
    const h___69__ = b___71__.length___72__;
    $(h___76__);
    c___82__ = c___80__ + 1;
    const tmpIfTest___84__ = c___86__ > 10;
    if (tmpIfTest___89__) {
      /*90*/ break;
    } /*92*/ else {
    }
  }
} /*93*/ else {
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
a:
  - w @10      | ########## | not read    | none           | 40
  - w @40      | ########## | 44,59,66    | 10,40          | 40
  - r @44      | 40
  - r @59      | 40
  - r @66      | 40

b:
  - w @14      | ########## | not read    | none           | 62,67
  - w @62      | ########## | 71          | 14,62,67       | 62,67
  - w @67      | ########## | 71          | 14,62,67       | 62,67
  - r @71      | 62,67

c:
  - w @18      | ########## | 80          | none           | 82
  - r @80      | 18,82
  - w @82      | ########## | 80,86       | 18,82          | 82
  - r @86      | 82

d:
  - w @21      | ########## | 37          | none           | none
  - r @37      | 21

e:
  - w @42      | ########## | 49          | none           | none
  - r @49      | 42

f:
  - w @47      | ########## | 53          | none           | none
  - r @53      | 47

h:
  - w @69      | ########## | 76          | none           | none
  - r @76      | 69

tmpIfTest:
  - w @84      | ########## | 89          | none           | none
  - r @89      | 84
