# Preval test case

# never_loops.md

> Ref tracking > Done > While-if > Never loops
>
> A loop that never loops should not be a loop
> We can fix this when our loops are while(true) and they guarantee to break at the end of every branching path

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
    break;
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
    break;
  }
} /*83*/ else {
}
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
a:
  - w @7       | ########## | not read    | none           | 36
  - w @36      | ########## | 41,57,64    | 7              | none
  - r @41      | 36
  - r @57      | 36
  - r @64      | 36

b:
  - w @12      | ########## | not read    | none           | 60,65
  - w @60      | ########## | 70          | 12             | none
  - w @65      | ########## | 70          | 12             | none
  - r @70      | 60,65

c:
  - w @17      | ########## | 79          | none           | 81
  - r @79      | 17
  - w @81      | ########## | not read    | 17             | none

d:
  - w @21      | ########## | 33          | none           | none
  - r @33      | 21

e:
  - w @39      | ########## | 47          | none           | none
  - r @47      | 39

f:
  - w @45      | ########## | 51          | none           | none
  - r @51      | 45

h:
  - w @68      | ########## | 75          | none           | none
  - r @75      | 68
