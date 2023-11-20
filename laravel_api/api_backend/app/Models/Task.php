<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    public function getDescricao(){
        return $this->attributes['description'];
    }

    public function setDescricao($attr){
        return $this->attributes['description'] = $attr;
    }

    public function getTitulo(){
        return $this->attributes['title'];
    }

    public function setTitulo($attr){
        return $this->attributes['title'] = $attr;
    }

    public function getStatus(){
        return $this->attributes['status'];
    }

    public function setStatus($attr){
        return $this->attributes['status'] = $attr;
    }

    public function getUserId(){
        return $this->attributes['user_id'];
    }

    public function setUserId($attr){
        return $this->attributes['user_id'] = $attr;
    }

    protected $fillable = ['title', 'description', 'user_id', 'status'];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
